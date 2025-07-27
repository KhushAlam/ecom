import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Profile({ title }) {
  let [data, setdata] = useState({
  })
  let role =localStorage.getItem("role");
  useEffect(() => {
    (async () => {
      let response = await fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}user/${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      if (response) {
        setdata({ ...response })
      }
    })()
  }, [])
  return (
    <>
      <h5 className='bg-primary text-center p-2 text-light'>{title} Address</h5>
      <div className="row">
        <div className={`${title==='Billing'?'d-none':''} col-md-6`}>
          <img src={data.pic ? `${process.env.REACT_APP_SITE_MAINCATEGORY}${data.pic}` : '/assets/img/nouser.webp'} className='w-100 ' height={440} alt='' />
        </div>
        <div className="col-md-6 mb-3 ">
          <table className='table table-bordered table-striped table-hover  w-100'>
            <tbody>
              {
                 title==="Buyer" ?
                  <>
                    <tr>
                      <th>Name</th>
                      <td>{data.name}</td>
                    </tr>
                    <tr>
                      <th>Username</th>
                      <td>{data.username}</td>
                    </tr>
                    <tr>
                      <th>Email Address</th>
                      <td>{data.email}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>+91 {data.phone}</td>
                    </tr>
                    {localStorage.getItem("role") !== "Buyer" ? <>
                      <tr>
                        <th>Role</th>
                        <td>{}</td>
                      </tr>
                    </> : null}
                    <tr>
                      <th>Address</th>
                      <td>{data.address}</td>
                    </tr>
                    <tr>
                      <th>Pin code</th>
                      <td> {data.pin}</td>
                    </tr>
                    <tr>
                      <th>State</th>
                      <td> {data.state}</td>
                    </tr>
                  </>
                   :
                    <>
                    <tr>
                      <th>Name</th>
                      <td>{data.name}</td>
                    </tr>
                    <tr>
                      <th>Username</th>
                      <td>{data.username}</td>
                    </tr>
                    <tr>
                      <th>Email Address</th>
                      <td>{data.email}</td>
                    </tr>

                    <tr>
                      <th>Phone</th>
                      <td>+91 {data.phone}</td>
                    </tr>
                    <tr>
                      <th>Role</th>
                      <td>{role}</td>
                    </tr>
                  </>
              }
              <tr>
                <td colSpan={2} >
                  <Link to="/update-profile" className='btn btn-primary w-100'>Update Profile</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
