import os
import sqlite3
from flask import Flask, render_template, request, redirect, url_for, session, flash

app = Flask(__name__)

# Secret key for session management (keep it secret in production)
app.secret_key = 'your_secret_key'

# Function to initialize the database
def init_db():
    db_path = os.path.join(app.root_path, 'database/users.db')
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            email TEXT PRIMARY KEY,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Function to validate users
def validate_user(email, password):
    db_path = os.path.join(app.root_path, 'database/users.db')
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute('SELECT password FROM users WHERE email = ?', (email,))
    user = c.fetchone()
    conn.close()
    return user and user[0] == password

# Function to add users
def add_user(email, password):
    db_path = os.path.join(app.root_path, 'database/users.db')
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute('INSERT INTO users (email, password) VALUES (?, ?)', (email, password))
    conn.commit()
    conn.close()

@app.route("/")
def home():
    logged_in = 'email' in session
    return render_template("index.html", logged_in=logged_in)

@app.route("/services")
def services():
    logged_in = 'email' in session
    return render_template("services.html", logged_in=logged_in)

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        if validate_user(email, password):
            session['email'] = email
            flash("You're logged in!")
            return redirect(url_for("home"))
        else:
            return "Invalid credentials", 401
    return render_template("login.html")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        db_path = os.path.join(app.root_path, 'database/users.db')
        conn = sqlite3.connect(db_path)
        c = conn.cursor()
        c.execute('SELECT * FROM users WHERE email = ?', (email,))
        if c.fetchone():
            conn.close()
            return "User already exists", 409
        add_user(email, password)
        conn.close()
        return redirect(url_for("login"))
    return render_template("signup.html")

@app.route("/logout")
def logout():
    session.pop('email', None)
    flash("You have logged out!")
    return redirect(url_for("home"))

@app.route("/web-hosting")
def web_hosting():
    return render_template("web-hosting.html")

@app.route("/game-hosting")
def game_hosting():
    return render_template("game-hosting.html")

@app.route("/cloud-services")
def cloud_services():
    return render_template("cloud.html")

@app.route("/vpn")
def vpn():
    return render_template("vpn.html")

@app.route('/about-us')
def about_us():
    return render_template('about-us.html')

@app.route('/contact-us', methods=['GET', 'POST'])
def contact_us():
    return render_template('contact-us.html')

@app.route('/support', methods=['GET', 'POST'])
def support():
    return render_template('support.html')

@app.route('/topology.html')
def topology():
    return render_template('topology.html')

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
