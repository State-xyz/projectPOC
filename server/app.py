from flask import Flask, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'database-test-poc.cuiez5xhdfr3.us-west-2.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'sskpi123'
app.config['MYSQL_DB'] = 'demo_poc'

mysql = MySQL(app)
CORS(app)


@app.route('/users', methods=['POST', 'GET'])
def login():
    cursor = mysql.connection.cursor()
    cursor.execute("select * from users")
    listUser = cursor.fetchall()
    cursor.close()
    user_array = []
    for user in listUser:
        user_object = {
            'name': user[1],
            'age': user[2],
            'phone': user[3],
            'address': user[4],
            'test_column_1': user[5]
        }
        user_array.append(user_object)

    return jsonify({
        'list': user_array
    }), 200


if __name__ == '__main__':
    app.run(host='localhost', port=5000)