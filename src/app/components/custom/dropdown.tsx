import {
    Menu,
    MenuHandler,
    Button,
    MenuList,
    MenuItem,
    Input,
  } from "@material-tailwind/react";
  import { ChevronDown, ChevronUp } from "lucide-react";
  
  // Define types for the props
  interface ProvinceCityMenuProps {
    locationOptions: {
      province_city: string[];
    };
    inputs: {
      province_city: string;
    };
    handleLocationChange: (field: string, value: string) => void;
  }
  
  export function ProvinceCityMenu({
    locationOptions,
    inputs,
    handleLocationChange,
  }: ProvinceCityMenuProps) {
    return (
      <Menu dismiss={{ itemPress: false }}>
        <MenuHandler>
          {({ open }: { open: boolean }) => (
            <Button className="flex items-center justify-between w-full">
              {inputs.province_city || "Select Province/City"}
              <span className="ml-2">
                {open ? (
                  <ChevronUp className="text-gray-600" />
                ) : (
                  <ChevronDown className="text-gray-600" />
                )}
              </span>
            </Button>
          )}
        </MenuHandler>
        <MenuList>
          <Input
            label="Search"
            containerProps={{
              className: "mb-4",
            }}
          />
          {locationOptions.province_city?.map((option, index) => (
            <MenuItem
              key={index}
              onClick={() => handleLocationChange("province_city", option)}
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  }
  