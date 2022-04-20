# 273-Lab2

## Etsy Clone by Parmeet Singh


### Steps to run the application:

1. Run Zookeeper and Kafka on your machines (your directories may vary)

- Start Zookeeper
```
/usr/local/kafka/bin/zookeeper-server-start.sh /usr/local/kafka/config/zookeeper.properties
```
- Start Kafka
```
/usr/local/kafka/bin/kafka-server-start.sh /usr/local/kafka/config/server.properties
```

<br/>

2. Create KAFKA Topics: 

- for example
```
/usr/local/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic get_all_items --replication-factor 1 --partitions 1
```



<br/>

3. Run Kafka Backend

- Change Directory into kafka backend folder

```
cd kafka-backend/
``` 	
- Install all modules

```
npm install
```
- Run Kafka server

```
npm start
```

<br/>
4. Run REST API Backend

- Change Directory into backend folder

```
cd backend/
``` 	
- Install all modules

```
npm install
```
- Run backend server

```
nodemon index.js
```
<br/>


5. Run React Frontend App

- Change Directory into frontend folder

```
cd frontend/
``` 	
- Install all modules

```
npm install
```
- Run React App server

```
npm start
```