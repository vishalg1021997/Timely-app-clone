import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import React, { useState, useMemo } from "react";
import {
    Box,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    ListSubheader,
    TextField,
    InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const containsText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const allOptions = ["Vishal", "Communication", "General"];

export default function SelectProject() {
    const [selectedOption, setSelectedOption] = useState('');

    const [searchText, setSearchText] = useState("");
    const displayedOptions = useMemo(
        () => allOptions.filter((option) => containsText(option, searchText)),
        [searchText]
    );

    return (
        <Box style={{ margin: '14px 10px', width: '148px', height: '32px' }}>
            <FormControl style={{ width: '148px', height: '32px' }}>
                <InputLabel id="search-select-label"
                    sx={{
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '-10px',
                        color: 'black'
                    }}>
                    <BusinessCenterIcon
                        sx={{
                            fontSize: '20px',
                            marginLeft: '-3px',
                            marginRight: '10px'
                        }} />
                    Any project</InputLabel>
                <Select
                    // Disables auto focus on MenuItems and allows TextField to be in focus
                    MenuProps={{ autoFocus: false }}
                    labelId="search-select-label"
                    id="search-select"
                    value={selectedOption}
                    label="Options"
                    onChange={(e) => setSelectedOption(e.target.value)}
                    onClose={() => setSearchText("")}
                    // This prevents rendering empty string in Select's value
                    // if search text would exclude currently selected option.
                    renderValue={() => selectedOption}
                    style={{
                        width: '148px', height: '30px',
                        backgroundColor: 'rgb(242 244 248)',
                    }}
                >
                    {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selefction.*/}
                    <ListSubheader>
                        <TextField
                            size="small"
                            // Autofocus on textfield
                            autoFocus
                            placeholder="Type to search..."
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key !== "Escape") {
                                    // Prevents autoselecting item while typing (default Select behaviour)
                                    e.stopPropagation();
                                }
                            }}
                        />
                    </ListSubheader>
                    {displayedOptions.map((option, i) => (
                        <> <MenuItem key={i} value={option}>
                            {/* {option} */}
                            <Checkbox checked={selectedOption.indexOf(option) > -1} />
                            <ListItemText primary={option} />
                        </MenuItem>
                        </>

                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
