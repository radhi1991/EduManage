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

// Mock data for teachers
const initialTeachers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    subject: "Mathematics",
    schoolId: 1,
    phone: "(555) 111-2222",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    subject: "Science",
    schoolId: 1,
    phone: "(555) 222-3333",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@example.com",
    subject: "English",
    schoolId: 2,
    phone: "(555) 333-4444",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    subject: "History",
    schoolId: 3,
    phone: "(555) 444-5555",
  },
]

// Mock data for schools (would come from API in real app)
const schools = [
  { id: 1, name: "Oakridge Academy" },
  { id: 2, name: "Riverside High School" },
  { id: 3, name: "Westview Elementary" },
]

interface Teacher {
  id: number
  name: string
  email: string
  subject: string
  schoolId: number
  phone: string
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | null>(null)
  const [newTeacher, setNewTeacher] = useState<Omit<Teacher, "id">>({
    name: "",
    email: "",
    subject: "",
    schoolId: 1,
    phone: "",
  })

  const handleAddTeacher = () => {
    const id = Math.max(0, ...teachers.map((t) => t.id)) + 1
    setTeachers([...teachers, { id, ...newTeacher }])
    setNewTeacher({ name: "", email: "", subject: "", schoolId: 1, phone: "" })
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

  const getSchoolName = (schoolId: number) => {
    const school = schools.find((s) => s.id === schoolId)
    return school ? school.name : "Unknown School"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-indigo-600 hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Teachers</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-md">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                  <DialogDescription>Enter the details for the new teacher.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={newTeacher.subject}
                      onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="school">School</Label>
                    <Select
                      value={newTeacher.schoolId.toString()}
                      onValueChange={(value) => setNewTeacher({ ...newTeacher, schoolId: Number.parseInt(value) })}
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
                  <Button onClick={handleAddTeacher}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="bg-white border shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle>{teacher.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-600">
                    <strong>Email:</strong> {teacher.email}
                  </p>
                  <p className="text-slate-600">
                    <strong>Phone:</strong> {teacher.phone}
                  </p>
                  <p className="text-slate-600">
                    <strong>Subject:</strong> {teacher.subject}
                  </p>
                  <p className="text-slate-600">
                    <strong>School:</strong> {getSchoolName(teacher.schoolId)}
                  </p>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
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
                        <DialogDescription>Update the teacher details.</DialogDescription>
                      </DialogHeader>
                      {currentTeacher && (
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-name">Full Name</Label>
                            <Input
                              id="edit-name"
                              value={currentTeacher.name}
                              onChange={(e) => setCurrentTeacher({ ...currentTeacher, name: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                              id="edit-email"
                              type="email"
                              value={currentTeacher.email}
                              onChange={(e) => setCurrentTeacher({ ...currentTeacher, email: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-phone">Phone</Label>
                            <Input
                              id="edit-phone"
                              value={currentTeacher.phone}
                              onChange={(e) => setCurrentTeacher({ ...currentTeacher, phone: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-subject">Subject</Label>
                            <Input
                              id="edit-subject"
                              value={currentTeacher.subject}
                              onChange={(e) => setCurrentTeacher({ ...currentTeacher, subject: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-school">School</Label>
                            <Select
                              value={currentTeacher.schoolId.toString()}
                              onValueChange={(value) =>
                                setCurrentTeacher({ ...currentTeacher, schoolId: Number.parseInt(value) })
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
                          Are you sure you want to delete {teacher.name}? This action cannot be undone.
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
      </div>
    </div>
  )
}

