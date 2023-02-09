from flask import Flask, jsonify
from flaskext.mysql import MySQL
from flask_cors import CORS

app = Flask(__name__)
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'admin'
app.config['MYSQL_DATABASE_PASSWORD'] = 'sskpi123'
app.config['MYSQL_DATABASE_DB'] = 'demo_poc'
app.config['MYSQL_DATABASE_HOST'] = 'database-test-poc.cuiez5xhdfr3.us-west-2.rds.amazonaws.com'
mysql.init_app(app)
CORS(app)


@app.route('/users', methods=['POST', 'GET'])
def getUsers():
    cursor = mysql.connect().cursor()
    cursor.execute("select * from users")
    listUser = cursor.fetchall()
    cursor.execute("SHOW COLUMNS FROM users")
    listColumn = cursor.fetchall()
    cursor.close()
    listColumn = [i[0] for i in listColumn]
    user_array = [dict(zip(listColumn, i)) for i in listUser]

    return jsonify({
        'list': user_array
    }), 200


if __name__ == '__main__':
    app.run(host='localhost', port=5000)
