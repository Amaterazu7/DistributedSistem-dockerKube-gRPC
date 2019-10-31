from app import app
import os
import cgi
import mysql.connector
import json
from datetime import date
from mysql.connector import Error, MySQLConnection
from flask import Flask, jsonify, request

@app.route("/")
def index():

    # Use os.getenv("key") to get environment variables
    app_name = os.getenv("APP_NAME")

    if app_name:
        return f"Hello from {app_name} running in a Docker container behind Nginx!! \n"

    return "Hello from Flask"

@app.route("/altaCiudad", methods=['POST'])
def altaCiudad():
    try:
        if (request.method == 'POST'):
            some_json = request.get_json()
            connection = mysql.connector.connect(host='db4free.net',
                                            database='rappioeste',
                                            user='rapiuser',
                                            password='rapiuserpass')
            cursor = connection.cursor()
            args=[some_json["code"], some_json["desc"], some_json["state"], some_json["state_code"], some_json["address"]]
            cursor.callproc("altaCiudad", args)
            connection.commit()
            return jsonify({"Recibido:": some_json}), 200
        else:
            return jsonify({"Recibido": "Error method"}), 405
    except mysql.connector.Error as error:
        print("Failed to execute stored procedure: {}".format(error))
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

@app.route("/bajaCiudad", methods=['PUT'])
def bajaCiudad():
    try:
        if (request.method == 'PUT'):
            some_json = request.get_json()
            connection = mysql.connector.connect(host='db4free.net',
                                            database='rappioeste',
                                            user='rapiuser',
                                            password='rapiuserpass')
            cursor = connection.cursor()
            args=[some_json["code"]]
            cursor.callproc("bajaCiudad", args)
            connection.commit()
            return jsonify({"Recibido:": some_json}), 200
        else:
            return jsonify({"Recibido": "Error method"}), 405
    except mysql.connector.Error as error:
        print("Failed to execute stored procedure: {}".format(error))
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

@app.route("/modificarMillas", methods=['PUT'])
def modificarMillas():
    try:
        if (request.method == 'PUT'):
            some_json = request.get_json()
            connection = mysql.connector.connect(host='db4free.net',
                                            database='rappioeste',
                                            user='rapiuser',
                                            password='rapiuserpass')
            cursor = connection.cursor()
            today = date.today()
            args=[some_json["miles"], some_json["price"], today.month, today.year]
            cursor.callproc("modificarMillas", args)
            connection.commit()
            return jsonify({"Recibido:": some_json}), 200
        else:
            return jsonify({"Recibido": "Error method"}), 405
    except mysql.connector.Error as error:
        print("Failed to execute stored procedure: {}".format(error))
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

@app.route("/emitirReporte", methods=['GET'])
def emitirReporte():
    try:
        if (request.method == 'GET'):
            some_json = request.get_json()
            connection = mysql.connector.connect(host='db4free.net',
                                            database='rappioeste',
                                            user='rapiuser',
                                            password='rapiuserpass')
            cursor = connection.cursor()
            today = date.today()
            args=[some_json["inicio"], some_json["fin"], some_json["origen"], some_json["destino"]]
            cursor.callproc("emitirReporte", args)
            x=[]
            for result in cursor.stored_results():
                x.append(result.fetchall())
            print(x)
            result_json = [{"Resultados": t} for t in zip(x)]
            return jsonify({"Recibido:": result_json}), 200
        else:
            return jsonify({"Recibido": "Error method"}), 405
    except mysql.connector.Error as error:
        print("Failed to execute stored procedure: {}".format(error))
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")