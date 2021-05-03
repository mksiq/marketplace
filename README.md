# Marketplace

This is a study on microservices. This project is about a marketplace for items in high demand. Something very common with the shortage of products during the pandemic caused by Covid19 and its repercussions on global supply.

## The concept

It is about a community of users that may sell and buy items. It is supposed to deal with fast transactions for limited supply, so when a user decides to buy an item and clicks on the checkout that item is reserved to him for 5 minutes. In case he does not complete the transaction the item is relisted to other users.

## Composition

### Resources

Resources to be created are User (for authentication), Item (the item being listed and sold), order (the reservation for the item), and the charge (the payment is handled by Stripe API).

### Micro Services to be used

Auth, items, orders, expiration (to deal with the removal of listing and relisting), and payments. The library is shared through a common library.

### Events handled

UserCreated, UserUpdated, OrderCreated, OrderCancelled, OrderExpired, TicketCreated, TicketUpdate, ChargeCreated. The event bus is handled by the NATS Streaming Server.

The main focus is the use of microservices. However, to make it more clear of how it is being handled there will be a client created served by Next.JS and React.

## Tolls to be used

NodeJS, Express, TypeScript, Redis, MongoDB, React, NextJS, Kubernetes.

## Instructions

> docker build -t mcksiq/auth ./auth/

> skaffold dev
