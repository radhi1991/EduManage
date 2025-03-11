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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2, BookCopy } from "lucide-react"

// Mock data for subjects
const initialSubjects = [
  {
    id: 1,
    name: "Mathematics",
    description: "Algebra, Geometry, and Calculus",
    teacherId: 1,
    schoolId: 1,
    grade: "10th",
    students: 32,
  },
  {
    id: 2,
    name: "Science",
    description: "Physics, Chemistry, and Biology",
    teacherId: 2,
    schoolId: 1,
    grade: "10th",
    students: 28,
  },
  {
    id: 3,
    name: "English",
    description: "Literature and Composition",
    teacherId: 3,
    schoolId: 2,
    grade: "11th",
    students: 30,
  },
  {
    id: 4,
    name: "History",
    description: "World History and Geography",
    teacherId: 4,
    schoolId: 3,
    grade: "9th",
    students: 26,
  },
  {
    id: 5,
    name: "Computer Science",
    description: "Programming and Computer Theory",
    teacherId: 1,
    schoolId: 2,
    grade: "12th",
    students: 24,
  },
]

// Mock data for teachers and schools
const teachers = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sarah Johnson" },
  { id: 3, name: "Michael Brown" },
  { id: 4, name: "Emily Davis" },
]

const schools = [
  { id: 1, name: "Oakridge Academy" },
  { id: 2, name: "Riverside High School" },
  { id: 3, name: "Westview Elementary" },
]

interface Subject {
  id: number
  name: string
  description: string
  teacherId: number
  schoolId: number
  grade: string
  students: number
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null)
  const [newSubject, setNewSubject] = useState<Omit<Subject, "id">>({
    name: "",
    description: "",
    teacherId: 1,
    schoolId: 1,
    grade: "",
    students: 0,
  })

  const handleAddSubject = () => {
    const id = Math.max(0, ...subjects.map((s) => s.id)) + 1
    setSubjects([...subjects, { id, ...newSubject }])
    setNewSubject({ name: "", description: "", teacherId: 1, schoolId: 1, grade: "", students: 0 })
    setIsAddDialogOpen(false)
  }

  const handleEditSubject = () => {
    if (!currentSubject) return
    setSubjects(subjects.map((subject) => (subject.id === currentSubject.id ? currentSubject : subject)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteSubject = () => {
    if (!currentSubject) return
    setSubjects(subjects.filter((subject) => subject.id !== currentSubject.id))
    setIsDeleteDialogOpen(false)
  }

  const getTeacherName = (teacherId: number) => {
    const teacher = teachers.find((t) => t.id === teacherId)
    return teacher ? teacher.name : "Unknown Teacher"
  }

  const getSchoolName = (schoolId: number) => {
    const school = schools.find((s) => s.id === schoolId)
    return school ? school.name : "Unknown School"
  }

  return (
    <DashboardLayout title="Manage Subjects">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Manage all subjects and classes in the system</p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
              <DialogDescription>Enter the details for the new subject or class.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Subject Name</Label>
                <Input
                  id="name"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="glass-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newSubject.description}
                  onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                  className="glass-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="grade">Grade/Level</Label>
                <Input
                  id="grade"
                  value={newSubject.grade}
                  onChange={(e) => setNewSubject({ ...newSubject, grade: e.target.value })}
                  className="glass-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="teacher">Teacher</Label>
                <Select
                  value={newSubject.teacherId.toString()}
                  onValueChange={(value) => setNewSubject({ ...newSubject, teacherId: Number.parseInt(value) })}
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id.toString()}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="school">School</Label>
                <Select
                  value={newSubject.schoolId.toString()}
                  onValueChange={(value) => setNewSubject({ ...newSubject, schoolId: Number.parseInt(value) })}
                >
                  <SelectTrigger className="glass-input">
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
              <Button onClick={handleAddSubject}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.id} className="glass-card overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <BookCopy className="h-5 w-5 text-primary" />
                <CardTitle>{subject.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm mb-4">
                <p className="text-muted-foreground">{subject.description}</p>
                <p className="text-muted-foreground">
                  <strong>Grade:</strong> {subject.grade}
                </p>
                <p className="text-muted-foreground">
                  <strong>Teacher:</strong> {getTeacherName(subject.teacherId)}
                </p>
                <p className="text-muted-foreground">
                  <strong>School:</strong> {getSchoolName(subject.schoolId)}
                </p>
                <p className="text-muted-foreground">
                  <strong>Students:</strong> {subject.students}
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Dialog
                  open={isEditDialogOpen && currentSubject?.id === subject.id}
                  onOpenChange={(open) => {
                    setIsEditDialogOpen(open)
                    if (open) setCurrentSubject(subject)
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
                      <DialogTitle>Edit Subject</DialogTitle>
                      <DialogDescription>Update the subject details.</DialogDescription>
                    </DialogHeader>
                    {currentSubject && (
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-name">Subject Name</Label>
                          <Input
                            id="edit-name"
                            value={currentSubject.name}
                            onChange={(e) => setCurrentSubject({ ...currentSubject, name: e.target.value })}
                            className="glass-input"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-description">Description</Label>
                          <Textarea
                            id="edit-description"
                            value={currentSubject.description}
                            onChange={(e) => setCurrentSubject({ ...currentSubject, description: e.target.value })}
                            className="glass-input"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-grade">Grade/Level</Label>
                          <Input
                            id="edit-grade"
                            value={currentSubject.grade}
                            onChange={(e) => setCurrentSubject({ ...currentSubject, grade: e.target.value })}
                            className="glass-input"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-teacher">Teacher</Label>
                          <Select
                            value={currentSubject.teacherId.toString()}
                            onValueChange={(value) =>
                              setCurrentSubject({ ...currentSubject, teacherId: Number.parseInt(value) })
                            }
                          >
                            <SelectTrigger className="glass-input">
                              <SelectValue placeholder="Select a teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              {teachers.map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                  {teacher.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-school">School</Label>
                          <Select
                            value={currentSubject.schoolId.toString()}
                            onValueChange={(value) =>
                              setCurrentSubject({ ...currentSubject, schoolId: Number.parseInt(value) })
                            }
                          >
                            <SelectTrigger className="glass-input">
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
                      <Button onClick={handleEditSubject}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isDeleteDialogOpen && currentSubject?.id === subject.id}
                  onOpenChange={(open) => {
                    setIsDeleteDialogOpen(open)
                    if (open) setCurrentSubject(subject)
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
                        Are you sure you want to delete {subject.name}? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                      <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteSubject}>
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

