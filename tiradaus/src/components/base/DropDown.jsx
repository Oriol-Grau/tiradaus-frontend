import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DropDown({ label, options, value, name }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={name}
          value={value}
          label={label}
          name={name}
        >
          {options.map(({ id, title }) => (
            <MenuItem key={id} value={id}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
