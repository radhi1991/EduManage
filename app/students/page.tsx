"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Plus, Pencil, Trash2 } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for students
const initialStudents = [
  { id: 1, name: "Alex Johnson", email: "alex.j@example.com", grade: "10th", schoolId: 1, phone: "(555) 123-7890" },
  { id: 2, name: "Emma Williams", email: "emma.w@example.com", grade: "9th", schoolId: 1, phone: "(555) 234-5678" },
  { id: 3, name: "Noah Brown", email: "noah.b@example.com", grade: "11th", schoolId: 2, phone: "(555) 345-6789" },
  { id: 4, name: "Olivia Davis", email: "olivia.d@example.com", grade: "8th", schoolId: 3, phone: "(555) 456-7890" },
]

// Mock data for schools (would come from API in real app)
const schools = [
  { id: 1, name: "Oakridge Academy" },
  { id: 2, name: "Riverside High School" },
  { id: 3, name: "Westview Elementary" },
]

interface Student {
  id: number
  name: string
  email: string
  grade: string
  schoolId: number
  phone: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)
  const [newStudent, setNewStudent] = useState<Omit<Student, "id">>({
    name: "",
    email: "",
    grade: "",
    schoolId: 1,
    phone: "",
  })

  const handleAddStudent = () => {
    const id = Math.max(0, ...students.map((s) => s.id)) + 1
    setStudents([...students, { id, ...newStudent }])
    setNewStudent({ name: "", email: "", grade: "", schoolId: 1, phone: "" })
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

  const getSchoolName = (schoolId: number) => {
    const school = schools.find((s) => s.id === schoolId)
    return school ? school.name : "Unknown School"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-emerald-600 hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Students</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-md">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>Enter the details for the new student.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Input
                      id="grade"
                      value={newStudent.grade}
                      onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="school">School</Label>
                    <Select
                      value={newStudent.schoolId.toString()}
                      onValueChange={(value) => setNewStudent({ ...newStudent, schoolId: Number.parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a school" />
                      </SelectTrigger>
                      <SelectContent>
                        {schools.map((school) => (
                          <SelectItem key={school.id} value={school.id.toString()}>
                            {school.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <Card key={student.id} className="bg-white border shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle>{student.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-600">
                    <strong>Email:</strong> {student.email}
                  </p>
                  <p className="text-slate-600">
                    <strong>Phone:</strong> {student.phone}
                  </p>
                  <p className="text-slate-600">
                    <strong>Grade:</strong> {student.grade}
                  </p>
                  <p className="text-slate-600">
                    <strong>School:</strong> {getSchoolName(student.schoolId)}
                  </p>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
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
                        <DialogDescription>Update the student details.</DialogDescription>
                      </DialogHeader>
                      {currentStudent && (
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-name">Full Name</Label>
                            <Input
                              id="edit-name"
                              value={currentStudent.name}
                              onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                              id="edit-email"
                              type="email"
                              value={currentStudent.email}
                              onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-phone">Phone</Label>
                            <Input
                              id="edit-phone"
                              value={currentStudent.phone}
                              onChange={(e) => setCurrentStudent({ ...currentStudent, phone: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-grade">Grade</Label>
                            <Input
                              id="edit-grade"
                              value={currentStudent.grade}
                              onChange={(e) => setCurrentStudent({ ...currentStudent, grade: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-school">School</Label>
                            <Select
                              value={currentStudent.schoolId.toString()}
                              onValueChange={(value) =>
                                setCurrentStudent({ ...currentStudent, schoolId: Number.parseInt(value) })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a school" />
                              </SelectTrigger>
                              <SelectContent>
                                {schools.map((school) => (
                                  <SelectItem key={school.id} value={school.id.toString()}>
                                    {school.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                          Are you sure you want to delete {student.name}? This action cannot be undone.
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
      </div>
    </div>
  )
}

