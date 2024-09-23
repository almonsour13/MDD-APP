'use client'

import { useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, ListFilter, File, PlusCircle } from "lucide-react"
import PageWrapper from "@/components/pageWrapper"

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string[]>([])

  const userData = [
    {
      userId: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'Active',
      createdAt: '2023-06-12 10:00 AM',
    },
    {
      userId: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
      status: 'Inactive',
      createdAt: '2023-07-24 02:15 PM',
    },
    {
      userId: 3,
      name: 'Sam Johnson',
      email: 'sam.johnson@example.com',
      role: 'User',
      status: 'Active',
      createdAt: '2023-08-02 09:30 AM',
    },
    {
      userId: 4,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      role: 'Moderator',
      status: 'Suspended',
      createdAt: '2023-09-18 11:45 AM',
    },
    {
      userId: 5,
      name: 'Michael White',
      email: 'michael.white@example.com',
      role: 'Admin',
      status: 'Active',
      createdAt: '2023-10-01 03:20 PM',
    },
    {
      userId: 6,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'User',
      status: 'Active',
      createdAt: '2023-10-15 11:30 AM',
    },
    {
      userId: 7,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      role: 'Moderator',
      status: 'Inactive',
      createdAt: '2023-11-02 09:45 AM',
    },
    {
      userId: 8,
      name: 'Sarah Taylor',
      email: 'sarah.taylor@example.com',
      role: 'User',
      status: 'Active',
      createdAt: '2023-11-20 02:00 PM',
    },
    {
      userId: 9,
      name: 'James Anderson',
      email: 'james.anderson@example.com',
      role: 'Admin',
      status: 'Suspended',
      createdAt: '2023-12-05 10:15 AM',
    },
    {
      userId: 10,
      name: 'Emma Thompson',
      email: 'emma.thompson@example.com',
      role: 'User',
      status: 'Active',
      createdAt: '2023-12-18 03:30 PM',
    }
  ]

  const filteredUsers = userData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus.length === 0 || filterStatus.includes(user.status))
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <PageWrapper>
      
      <div className="flex items-center justify-between gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {['Active', 'Inactive', 'Suspended'].map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={filterStatus.includes(status)}
                  onCheckedChange={(checked) => {
                    setFilterStatus(
                      checked
                        ? [...filterStatus, status]
                        : filterStatus.filter((s) => s !== status)
                    )
                  }}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add User
            </span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage your users and view their account details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto" style={{ minHeight: '300px', maxHeight: '500px' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Created At</TableHead>
                  <TableHead className="text-right md:text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((user, index) => (
                  <TableRow key={user.userId}>
                    <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.role}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className={` rounded-full text-xs font-medium ${
                        user.status === 'Active' ? ' text-green-800' :
                        user.status === 'Inactive' ? ' text-yellow-800' :
                        ' text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{user.createdAt}</TableCell>
                    <TableCell className="text-right md:text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-start md:justify-between items-start md:items-center">
          <div className="text-sm text-muted-foreground mb-2 sm:mb-0">
            Showing <strong>{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredUsers.length)}</strong> of <strong>{filteredUsers.length}</strong> users
          </div>
          <div className="flex justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= filteredUsers.length}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </PageWrapper>
  )
}