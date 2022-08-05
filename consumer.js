const amqp = require('amqplib')

connect()

async function connect() {
    try {
        const connection = await amqp.connect('amqp://localhost:5672')
        const channel = await connection.createChannel()
        const result = await channel.assertQueue('jobs')

        channel.consume('jobs', message => {
            channel.ack(message)
            const input = JSON.parse(message.content.toString())
            console.log(`Received message with input ${input.number}`)
        })

        console.log('Waiting for messages...')
    } catch (ex) {
        console.error(ex)
    }
}