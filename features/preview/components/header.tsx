import Icon from "@/components/icon";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search01Icon } from "@hugeicons/core-free-icons";

const devices = [
  { label: "Website", value: "website" },
  { label: "App", value: "app" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-sidebar p-2 flex items-center justify-between border-b border-sidebar-border">
      <div className="flex items-center gap-2">
        <Select items={devices} defaultValue={"website"}>
          <SelectTrigger id="device-select" className="w-38">
            <SelectValue placeholder="Select a device" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {devices.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <InputGroup className="max-w-lg">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Icon icon={Search01Icon} />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Sponsor me */}
    </header>
  );
}
