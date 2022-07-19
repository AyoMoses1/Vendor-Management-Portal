import React, { useState, useEffect } from 'react'
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'
import { SimpleCard, Breadcrumb } from 'matx'
import { getUserById } from './UserService'

const UserInfo = ({ location }) => {
  const { id } = location.state
  const [user, setUser] = useState([])

  useEffect(() => {
    getUserById(id).then(({ data }) => {
      setUser(data.object)
    })
  }, [id])
  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'User', path: '/users' },
            { name: 'View User' },
          ]}
        />
      </div>
      <SimpleCard>
        <Divider />
        <Table className='mb-4'>
          <TableBody>
            <TableRow>
              <TableCell className='pl-4'>Email</TableCell>
              <TableCell>
                <div>{user.email}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-4'>Phone Number</TableCell>
              <TableCell>
                <div>{user.phoneNo}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-4'>Name</TableCell>
              <TableCell>
                <div>
                  {user.firstName} {user.lastName}
                </div>
              </TableCell>
            </TableRow>
            {/* {userInfo.map((item, ind) => (
              <TableRow key={ind}>
                <TableCell className='pl-4'>{`Address ${ind + 1}`}</TableCell>
                <TableCell>{item.address}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </SimpleCard>
    </div>
  )
}

export default UserInfo
