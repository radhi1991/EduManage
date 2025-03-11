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
import { Textarea } from "@/components/ui/textarea"

// Mock data for schools
const initialSchools = [
  {
    id: 1,
    name: "Oakridge Academy",
    address: "123 Main St, Anytown",
    phone: "(555) 123-4567",
    email: "info@oakridge.edu",
  },
  {
    id: 2,
    name: "Riverside High School",
    address: "456 River Rd, Anytown",
    phone: "(555) 987-6543",
    email: "admin@riverside.edu",
  },
  {
    id: 3,
    name: "Westview Elementary",
    address: "789 West Ave, Anytown",
    phone: "(555) 456-7890",
    email: "office@westview.edu",
  },
]

interface School {
  id: number
  name: string
  address: string
  phone: string
  email: string
}

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>(initialSchools)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentSchool, setCurrentSchool] = useState<School | null>(null)
  const [newSchool, setNewSchool] = useState<Omit<School, "id">>({
    name: "",
    address: "",
    phone: "",
    email: "",
  })

  const handleAddSchool = () => {
    const id = Math.max(0, ...schools.map((s) => s.id)) + 1
    setSchools([...schools, { id, ...newSchool }])
    setNewSchool({ name: "", address: "", phone: "", email: "" })
    setIsAddDialogOpen(false)
  }

  const handleEditSchool = () => {
    if (!currentSchool) return
    setSchools(schools.map((school) => (school.id === currentSchool.id ? currentSchool : school)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteSchool = () => {
    if (!currentSchool) return
    setSchools(schools.filter((school) => school.id !== currentSchool.id))
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-primary hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Schools</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-primary/90 shadow-md">
                  <Plus className="h-4 w-4 mr-2" />
                  Add School
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New School</DialogTitle>
                  <DialogDescription>Enter the details for the new school.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">School Name</Label>
                    <Input
                      id="name"
                      value={newSchool.name}
                      onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={newSchool.address}
                      onChange={(e) => setNewSchool({ ...newSchool, address: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newSchool.phone}
                      onChange={(e) => setNewSchool({ ...newSchool, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newSchool.email}
                      onChange={(e) => setNewSchool({ ...newSchool, email: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddSchool}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <Card key={school.id} className="bg-white border shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle>{school.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-600">
                    <strong>Address:</strong> {school.address}
                  </p>
                  <p className="text-slate-600">
                    <strong>Phone:</strong> {school.phone}
                  </p>
                  <p className="text-slate-600">
                    <strong>Email:</strong> {school.email}
                  </p>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Dialog
                    open={isEditDialogOpen && currentSchool?.id === school.id}
                    onOpenChange={(open) => {
                      setIsEditDialogOpen(open)
                      if (open) setCurrentSchool(school)
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
                        <DialogTitle>Edit School</DialogTitle>
                        <DialogDescription>Update the school details.</DialogDescription>
                      </DialogHeader>
                      {currentSchool && (
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-name">School Name</Label>
                            <Input
                              id="edit-name"
                              value={currentSchool.name}
                              onChange={(e) => setCurrentSchool({ ...currentSchool, name: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-address">Address</Label>
                            <Textarea
                              id="edit-address"
                              value={currentSchool.address}
                              onChange={(e) => setCurrentSchool({ ...currentSchool, address: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-phone">Phone</Label>
                            <Input
                              id="edit-phone"
                              value={currentSchool.phone}
                              onChange={(e) => setCurrentSchool({ ...currentSchool, phone: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                              id="edit-email"
                              type="email"
                              value={currentSchool.email}
                              onChange={(e) => setCurrentSchool({ ...currentSchool, email: e.target.value })}
                            />
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleEditSchool}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={isDeleteDialogOpen && currentSchool?.id === school.id}
                    onOpenChange={(open) => {
                      setIsDeleteDialogOpen(open)
                      if (open) setCurrentSchool(school)
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
                          Are you sure you want to delete {school.name}? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteSchool}>
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

