"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2 } from "lucide-react"

// Mock data for teachers
const initialTeachers = [
  { id: 1, name: "John Smith", email: "john.smith@example.com", subject: "Mathematics" },
  { id: 2, name: "Sarah Johnson", email: "sarah.j@example.com", subject: "Science" },
  { id: 3, name: "Michael Brown", email: "m.brown@example.com", subject: "English" },
]

interface Teacher {
  id: number
  name: string
  email: string
  subject: string
}

export default function ManageTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | null>(null)
  const [newTeacher, setNewTeacher] = useState<Omit<Teacher, "id">>({
    name: "",
    email: "",
    subject: "",
  })

  const handleAddTeacher = () => {
    const id = Math.max(0, ...teachers.map((t) => t.id)) + 1
    setTeachers([...teachers, { id, ...newTeacher }])
    setNewTeacher({ name: "", email: "", subject: "" })
    setIsAddDialogOpen(false)
  }

  const handleEditTeacher = () => {
    if (!currentTeacher) return
    setTeachers(teachers.map((teacher) => (teacher.id === currentTeacher.id ? currentTeacher : teacher)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteTeacher = () => {
    if (!currentTeacher) return
    setTeachers(teachers.filter((teacher) => teacher.id !== currentTeacher.id))
    setIsDeleteDialogOpen(false)
  }

  return (
    <DashboardLayout title="Manage Teachers">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Manage teacher accounts</p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
              <DialogDescription>Enter the details for the new teacher account.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  className="glass-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  className="glass-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newTeacher.subject}
                  onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                  className="glass-input"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTeacher}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="glass-card overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle>{teacher.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm mb-4">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> {teacher.email}
                </p>
                <p className="text-muted-foreground">
                  <strong>Subject:</strong> {teacher.subject}
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Dialog
                  open={isEditDialogOpen && currentTeacher?.id === teacher.id}
                  onOpenChange={(open) => {
                    setIsEditDialogOpen(open)
                    if (open) setCurrentTeacher(teacher)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Teacher</DialogTitle>
                      <DialogDescription>Update the teacher account details.</DialogDescription>
                    </DialogHeader>
                    {currentTeacher && (
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-name">Name</Label>
                          <Input
                            id="edit-name"
                            value={currentTeacher.name}
                            onChange={(e) => setCurrentTeacher({ ...currentTeacher, name: e.target.value })}
                            className="glass-input"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-email">Email</Label>
                          <Input
                            id="edit-email"
                            type="email"
                            value={currentTeacher.email}
                            onChange={(e) => setCurrentTeacher({ ...currentTeacher, email: e.target.value })}
                            className="glass-input"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-subject">Subject</Label>
                          <Input
                            id="edit-subject"
                            value={currentTeacher.subject}
                            onChange={(e) => setCurrentTeacher({ ...currentTeacher, subject: e.target.value })}
                            className="glass-input"
                          />
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleEditTeacher}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isDeleteDialogOpen && currentTeacher?.id === teacher.id}
                  onOpenChange={(open) => {
                    setIsDeleteDialogOpen(open)
                    if (open) setCurrentTeacher(teacher)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="flex items-center">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Confirm Deletion</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete {teacher.name}'s account? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                      <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteTeacher}>
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}

