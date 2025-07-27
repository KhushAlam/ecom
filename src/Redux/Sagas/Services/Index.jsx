import React from 'react'

export async function createRecord(collection, payload) {
    let responce = fetch(process.env.REACT_APP_SITE_MAINCATEGORY + collection, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ ...payload })
    })
    return (await responce).json()
}
// if payload has files
export async function createmultipathRecord(collection, payload) {
    let responce = fetch(process.env.REACT_APP_SITE_MAINCATEGORY + collection, {
        method: "POST",
        headers: {
        },
        body: payload
    })
    return (await responce).json()
}

export async function updateRecord(collection, payload) {
    let responce = fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}${collection}/${payload.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ ...payload })
    })
    return (await responce).json()
}
// if paylaod has file
export async function updatemultiRecord(collection, payload) {
    let responce = fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}${collection}/${payload.id}`, {
        method: "PUT",
        headers: {
        },
        body: payload
    })
    return (await responce).json()
}

export async function getRecord(collection) {
    let responce = fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}${collection}`, {
        method: "get",
        headers: {
            "content-type": "application/json"
        },
    })
    return (await responce).json()
}

export async function deleteRecord(collection, payload) {
    let responce = fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}${collection}/${payload.id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ ...payload })
    })
    return (await responce).json()
}