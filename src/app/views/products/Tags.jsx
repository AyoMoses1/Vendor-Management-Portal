import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core'
import http from '../../services/api'
import CreateNew from './CreateNew'
import { valuesIn } from 'lodash'
import { useDialog } from 'muibox'

const fields = ['name', 'description']

const Tags = () => {
  const [isAlive, setIsAlive] = useState(true)
  const [tags, setTags] = useState([])
  const [open, setOpen] = useState(false)
  const dialog = useDialog()

  useEffect(() => {
    http.get(`/afrimash/tags/`).then((response) => {
      let { data } = response
      if (isAlive) setTags(data.object)
    })
    return () => setIsAlive(false)
  }, [isAlive])

  const handleModal = () => {
    setOpen(!open)
  }

  const submit = (state) => {
    return http.post('/afrimash/tags', state)
  }

  const columns = [
    {
      name: 'name', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let tag = tags[dataIndex]
          return (
            <div className='flex items-center'>
              <div className='ml-3'>
                <h5 className='my-0 text-15'>{`${tag?.name}`}</h5>
              </div>
            </div>
          )
        },
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let tag = tags[dataIndex]
          return (
            <div className='flex items-center'>
              <div className='ml-3'>
                <h5 className='my-0 text-15'> {tag.description || '-----'}</h5>
              </div>
            </div>
          )
        },
      },
    },
    {
      name: 'action',
      label: 'Actions ',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          return (
            <div className='flex items-center'>
              <div className='flex-grow'>
                <IconButton>
                  <Icon>delete</Icon>
                </IconButton>
              </div>
              {/* <IconButton
                variant="contained"
                color="primary"
                onClick={() => {
                  handleModal();
                }}
              >
                <Icon>edit</Icon>
              </IconButton> */}
            </div>
          )
        },
      },
    },
  ]

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb routeSegments={[{ name: 'Tags', path: '/tags' }]} />
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750'>
          <MUIDataTable
            title={'Tags'}
            data={tags}
            columns={columns}
            options={{
              onRowsDelete: (data) =>
                dialog
                  .confirm('Are you sure you want to delete?')
                  .then((value) => value)
                  .catch(() => {
                    return false
                  }),
              filterType: 'textField',
              responsive: 'standard',
              //   selectableRows: "none", // set checkbox for each row
              //   search: false, // set search option
              //   filter: false, // set data filter option
              //   download: false, // set download option
              //   print: false, // set print option
              //   pagination: true, //set pagination option
              //   viewColumns: false, // set column option
              elevation: 0,
              rowsPerPageOptions: [10, 20, 40, 80, 100],
              customSearchRender: (
                searchText,
                handleSearch,
                hideSearch,
                options
              ) => {
                return (
                  <Grow appear in={true} timeout={300}>
                    <TextField
                      variant='outlined'
                      size='small'
                      fullWidth
                      onChange={({ target: { value } }) => handleSearch(value)}
                      InputProps={{
                        style: {
                          paddingRight: 0,
                        },
                        startAdornment: (
                          <Icon className='mr-2' fontSize='small'>
                            search
                          </Icon>
                        ),
                        endAdornment: (
                          <IconButton onClick={hideSearch}>
                            <Icon fontSize='small'>clear</Icon>
                          </IconButton>
                        ),
                      }}
                    />
                  </Grow>
                )
              },
              customToolbar: () => {
                return (
                  <>
                    <IconButton>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                          handleModal()
                        }}
                      >
                        <Icon>add</Icon>Add New
                      </Button>
                    </IconButton>
                    <CreateNew
                      states={tags}
                      isOpen={open}
                      handleClose={handleModal}
                      name='Create Tag'
                      fields={fields}
                      onSubmit={submit}
                    />
                  </>
                )
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Tags
