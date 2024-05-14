package com.example.raresm.sdproject1.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConnection {
    @Value("${spring.rabbitmq.queue}")
    private String queue;
    @Value("{spring.rabbitmq.exchange}")
    private String exchange;
    @Value("{spring.rabbitmq.routingKey}")
    private String routingKey;

    @Bean
    Queue queue(){
        return new Queue(queue, true);
    }

    @Bean
    Exchange exchange(){
        return ExchangeBuilder.directExchange(exchange).durable(true).build();
    }

    @Bean
    Binding binding(){
        return BindingBuilder
                .bind(queue())
                .to(exchange())
                .with(routingKey)
                .noargs();
    }

    @Bean
    public ConnectionFactory connectionFactory(){
        String URI = System.getenv("CLOUDAMQP_URL");
        if(URI == null)
            URI = "amqps://jjxruqxp:OFxA_s388IUxC8KvGymve4GmFxvlwlvP@sparrow.rmq.cloudamqp.com/jjxruqxp";
        CachingConnectionFactory cachingConnectionFactory = new CachingConnectionFactory();
        cachingConnectionFactory.setUri(URI);
        return cachingConnectionFactory;
    }

    @Bean
    public MessageConverter jsonMessageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory){
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
//        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }
}
