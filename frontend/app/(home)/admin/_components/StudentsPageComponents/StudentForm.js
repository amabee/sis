import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StudentForm({ student, onChange, labelStyle }) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label htmlFor="name" className={labelStyle}>
            Full Name *
          </label>
          <Input
            id="name"
            placeholder="Full Name"
            value={student.name}
            onChange={(e) => onChange({ ...student, name: e.target.value })}
            required
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="email" className={labelStyle}>
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Email Address"
            value={student.email}
            onChange={(e) => onChange({ ...student, email: e.target.value })}
            required
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="program" className={labelStyle}>
            Program *
          </label>
          <Input
            id="program"
            placeholder="Program"
            value={student.program}
            onChange={(e) => onChange({ ...student, program: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="level" className={labelStyle}>
            Program Level
          </label>
          <Select
            value={student.level}
            onValueChange={(value) => onChange({ ...student, level: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Undergraduate">Undergraduate</SelectItem>
              <SelectItem value="Graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="modality" className={labelStyle}>
            Modality
          </label>
          <Select
            value={student.modality}
            onValueChange={(value) => onChange({ ...student, modality: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select modality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Face to Face">Face to Face</SelectItem>
              <SelectItem value="Modular">Modular</SelectItem>
              <SelectItem value="Blended">Blended</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <label htmlFor="status" className={labelStyle}>
            Status
          </label>
          <Select
            value={student.status}
            onValueChange={(value) => onChange({ ...student, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
