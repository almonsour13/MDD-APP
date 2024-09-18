import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal,Badge } from "lucide-react";
import PageWrapper from "@/components/pageWrapper";
export default function Users(){
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
        }
      ];
      
    return(
        <PageWrapper>
            <Card x-chunk="dashboard-06-chunk-0" className="flex-1">
        <CardHeader>
          <CardTitle>Recent Upload Image</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
  <TableHeader>
    <TableRow>
      <TableHead>User ID</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Created At</TableHead>
      <TableHead className="text-center">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {userData.map((user) => (
      <TableRow key={user.userId}>
        <TableCell>{user.userId}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{user.status}</TableCell>
        <TableCell>{user.createdAt}</TableCell>
        <TableCell className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

            </CardContent>
            <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                products
            </div>
            </CardFooter>
      </Card>
        </PageWrapper>
    )
}