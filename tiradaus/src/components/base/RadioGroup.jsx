import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";

export default function RadioGroupForm({
  name,
  options,
  label = "",
  helperText = "",
  error = false,
}) {
  return (
    <FormControl sx={{ m: 2 }} error={error} variant="standard">
      <FormLabel id="demo-error-radios">{label}</FormLabel>
      <RadioGroup aria-labelledby="demo-error-radios" name={name}>
        {options.map(({ value, label }) => (
          <FormControlLabel value={value} control={<Radio />} label={label} />
        ))}
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
