import React from 'react'

export async function createRecord(collection, payload) {
    let responce = fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}${collection}/create`, {
        method: "POST",
        headers: {
        },
        body: payload
    })
    return (await responce).json()
}
// if payload has files
// export async function createmultipathRecord(collection, payload) {
//     let responce = fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}${collection}/get`, {
//         method: "POST",
//         headers: {
//         },
//         body: payload
//     })
//     return (await responce).json()
// }

export async function updateRecord(collection, payload) {
    let id = payload.get("_id")
    let responce = fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}${collection}/update/${id}`, {
        method: "PUT",
        headers: {
        },
        body: payload
    })
    return (await responce).json()
}
// if paylaod has file
// export async function updatemultiRecord(collection, payload) {
//     let responce = fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}${collection}/${payload.id}`, {
//         method: "PUT",
//         headers: {
//         },
//         body: payload
//     })
//     return (await responce).json()
// }

export async function getRecord(collection) {
    let responce = fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}${collection}/get`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        },
    })
    return (await responce).json()
}

export async function deleteRecord(collection, payload) {
    let id = payload.get("_id");
    let responce = fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}${collection}/delete/${id}`, {
        method: "DELETE",
        headers: {
        },
        body: payload
    })
    return (await responce).json()
}