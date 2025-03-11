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

// Mock data for students
const initialStudents = [
  { id: 1, name: "Alice Johnson", email: "alice.j@example.com", grade: "10th" },
  { id: 2, name: "Bob Smith", email: "bob.s@example.com", grade: "11th" },
  { id: 3, name: "Charlie Brown", email: "charlie.b@example.com", grade: "9th" },
]

interface Student {
  id: number
  name: string
  email: string
  grade: string
}

export default function ManageStudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)
  const [newStudent, setNewStudent] = useState<Omit<Student, "id">>({
    name: "",
    email: "",
    grade: "",
  })

  const handleAddStudent = () => {
    const id = Math.max(0, ...students.map((s) => s.id)) + 1
    setStudents([...students, { id, ...newStudent }])
    setNewStudent({ name: "", email: "", grade: "" })
    setIsAddDialogOpen(false)
  }

  const handleEditStudent = () => {
    if (!currentStudent) return
    setStudents(students.map((student) => (student.id === currentStudent.id ? currentStudent : student)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteStudent = () => {
    if (!currentStudent) return
    setStudents(students.filter((student) => student.id !== currentStudent.id))
    setIsDeleteDialogOpen(false)
  }

  return (
    <DashboardLayout title="Manage Students">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Manage student accounts</p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter the details for the new student account.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="glass-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="glass-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  value={newStudent.grade}
                  onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                  className="glass-input"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Card key={student.id} className="glass-card overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle>{student.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm mb-4">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> {student.email}
                </p>
                <p className="text-muted-foreground">
                  <strong>Grade:</strong> {student.grade}
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Dialog
                  open={isEditDialogOpen && currentStudent?.id === student.id}
                  onOpenChange={(open) => {
                    setIsEditDialogOpen(open)
                    if (open) setCurrentStudent(student)
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
                      <DialogTitle>Edit Student</DialogTitle>
                      <DialogDescription>Update the student account details.</DialogDescription>
                    </DialogHeader>
                    {currentStudent && (
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-name">Name</Label>
                          <Input
                            id="edit-name"
                            value={currentStudent.name}
                            onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
                            className="glass-input"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-email">Email</Label>
                          <Input
                            id="edit-email"
                            type="email"
                            value={currentStudent.email}
                            onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })}
                            className="glass-input"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-grade">Grade</Label>
                          <Input
                            id="edit-grade"
                            value={currentStudent.grade}
                            onChange={(e) => setCurrentStudent({ ...currentStudent, grade: e.target.value })}
                            className="glass-input"
                          />
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleEditStudent}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isDeleteDialogOpen && currentStudent?.id === student.id}
                  onOpenChange={(open) => {
                    setIsDeleteDialogOpen(open)
                    if (open) setCurrentStudent(student)
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
                        Are you sure you want to delete {student.name}'s account? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                      <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteStudent}>
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

