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
import { Plus, Pencil, Trash2, FileText, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for homeworks
const initialHomeworks = [
  {
    id: 1,
    title: "Quadratic Equations",
    description: "Solve the given quadratic equations using the quadratic formula.",
    subjectId: 1,
    dueDate: "2023-06-15",
    status: "active",
    submissions: 18,
  },
  {
    id: 2,
    title: "Chemical Reactions Lab Report",
    description: "Write a lab report on the chemical reactions observed in today's experiment.",
    subjectId: 2,
    dueDate: "2023-06-18",
    status: "active",
    submissions: 15,
  },
  {
    id: 3,
    title: "Essay: Modern Literature",
    description: "Write a 1000-word essay analyzing the themes in the assigned reading.",
    subjectId: 3,
    dueDate: "2023-06-20",
    status: "active",
    submissions: 12,
  },
  {
    id: 4,
    title: "Historical Analysis",
    description: "Research and analyze a significant historical event from the 20th century.",
    subjectId: 4,
    dueDate: "2023-06-22",
    status: "draft",
    submissions: 0,
  },
]

// Mock data for subjects
const subjects = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Science" },
  { id: 3, name: "English" },
  { id: 4, name: "History" },
  { id: 5, name: "Computer Science" },
]

interface Homework {
  id: number
  title: string
  description: string
  subjectId: number
  dueDate: string
  status: "active" | "draft" | "completed"
  submissions: number
}

export default function HomeworksPage() {
  const [homeworks, setHomeworks] = useState<Homework[]>(initialHomeworks)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentHomework, setCurrentHomework] = useState<Homework | null>(null)
  const [newHomework, setNewHomework] = useState<Omit<Homework, "id">>({
    title: "",
    description: "",
    subjectId: 1,
    dueDate: "",
    status: "draft",
    submissions: 0,
  })

  const handleAddHomework = () => {
    const id = Math.max(0, ...homeworks.map((h) => h.id)) + 1
    setHomeworks([...homeworks, { id, ...newHomework }])
    setNewHomework({ title: "", description: "", subjectId: 1, dueDate: "", status: "draft", submissions: 0 })
    setIsAddDialogOpen(false)
  }

  const handleEditHomework = () => {
    if (!currentHomework) return
    setHomeworks(homeworks.map((homework) => (homework.id === currentHomework.id ? currentHomework : homework)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteHomework = () => {
    if (!currentHomework) return
    setHomeworks(homeworks.filter((homework) => homework.id !== currentHomework.id))
    setIsDeleteDialogOpen(false)
  }

  const getSubjectName = (subjectId: number) => {
    const subject = subjects.find((s) => s.id === subjectId)
    return subject ? subject.name : "Unknown Subject"
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>
      default:
        return null
    }
  }

  return (
    <DashboardLayout title="Manage Homeworks">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Manage all homework assignments in the system</p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Homework
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Homework</DialogTitle>
              <DialogDescription>Enter the details for the new homework assignment.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newHomework.title}
                  onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })}
                  className="glass-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newHomework.description}
                  onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })}
                  className="glass-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={newHomework.subjectId.toString()}
                  onValueChange={(value) => setNewHomework({ ...newHomework, subjectId: Number.parseInt(value) })}
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id.toString()}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newHomework.dueDate}
                  onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
                  className="glass-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newHomework.status}
                  onValueChange={(value: "active" | "draft" | "completed") =>
                    setNewHomework({ ...newHomework, status: value })
                  }
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddHomework}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homeworks.map((homework) => (
          <Card key={homework.id} className="glass-card overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{homework.title}</CardTitle>
                </div>
                {getStatusBadge(homework.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm mb-4">
                <p className="text-muted-foreground">{homework.description}</p>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    <strong>Due:</strong> {formatDate(homework.dueDate)}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  <strong>Subject:</strong> {getSubjectName(homework.subjectId)}
                </p>
                {homework.submissions > 0 && (
                  <p className="text-muted-foreground">
                    <strong>Submissions:</strong> {homework.submissions}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <Dialog
                  open={isEditDialogOpen && currentHomework?.id === homework.id}
                  onOpenChange={(open) => {
                    setIsEditDialogOpen(open)
                    if (open) setCurrentHomework(homework)
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
                      <DialogTitle>Edit Homework</DialogTitle>
                      <DialogDescription>Update the homework assignment details.</DialogDescription>
                    </DialogHeader>
                    {currentHomework && (
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-title">Title</Label>
                          <Input
                            id="edit-title"
                            value={currentHomework.title}
                            onChange={(e) => setCurrentHomework({ ...currentHomework, title: e.target.value })}
                            className="glass-input"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-description">Description</Label>
                          <Textarea
                            id="edit-description"
                            value={currentHomework.description}
                            onChange={(e) => setCurrentHomework({ ...currentHomework, description: e.target.value })}
                            className="glass-input"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-subject">Subject</Label>
                          <Select
                            value={currentHomework.subjectId.toString()}
                            onValueChange={(value) =>
                              setCurrentHomework({ ...currentHomework, subjectId: Number.parseInt(value) })
                            }
                          >
                            <SelectTrigger className="glass-input">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem key={subject.id} value={subject.id.toString()}>
                                  {subject.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-dueDate">Due Date</Label>
                          <Input
                            id="edit-dueDate"
                            type="date"
                            value={currentHomework.dueDate}
                            onChange={(e) => setCurrentHomework({ ...currentHomework, dueDate: e.target.value })}
                            className="glass-input"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-status">Status</Label>
                          <Select
                            value={currentHomework.status}
                            onValueChange={(value: "active" | "draft" | "completed") =>
                              setCurrentHomework({ ...currentHomework, status: value })
                            }
                          >
                            <SelectTrigger className="glass-input">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleEditHomework}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isDeleteDialogOpen && currentHomework?.id === homework.id}
                  onOpenChange={(open) => {
                    setIsDeleteDialogOpen(open)
                    if (open) setCurrentHomework(homework)
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
                        Are you sure you want to delete {homework.title}? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                      <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteHomework}>
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

