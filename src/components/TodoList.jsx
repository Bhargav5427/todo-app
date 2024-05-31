import * as React from "react";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { BiPlus } from "react-icons/bi";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export default function TodoList() {
  const [open, setOpen] = React.useState(false);
  let dispatch = useDispatch();
  const showToast = (title, icon) => {
    const Toast = Swal.mixin({
      background: "black",
      color: "white",
      toast: true,
      width: "auto",
      position: "bottom-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({ icon, title });
  };

  let { todo, isError, isLoading } = useSelector((state) => state.todo);
  if (isError) {
    showToast(isError, "error");
  }
  if (isLoading) {
    return (
      <div
        className="loader"
        style={{ marginTop: "300px" }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <Grid container columns={16} sx={{ flexGrow: 1 }} mt={5}>
        <Grid xs={8}>
          <Item>
            <Button
              variant="solid"
              color="primary"
              startDecorator={<BiPlus />}
              onClick={() => setOpen(true)}
            >
              New Task
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalDialog>
                <DialogTitle>Create new project</DialogTitle>
                <DialogContent>
                  Fill in the information of the project.
                </DialogContent>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setOpen(false);
                  }}
                >
                  <Stack spacing={2} sx={{ width: "450px" }}>
                    <FormControl>
                      <FormLabel>Task Title</FormLabel>
                      <Input autoFocus required />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Input required />
                    </FormControl>
                    <Button type="submit">Submit</Button>
                  </Stack>
                </form>
              </ModalDialog>
            </Modal>
          </Item>
        </Grid>
        <Grid xs={8}>
          <Item>FILTER</Item>
        </Grid>
      </Grid>
      <Box sx={{ maxWidth: "1000px", margin: "0 auto", marginTop: "20px" }}>
        <Box
          sx={{
            backgroundColor: "#ecedf6",
            padding: "20px",
            borderRadius: "10px",
            height: "100%",
            width: "100%",
          }}
        >
          <ul>
            <li className="todo-box">
              <div className="todo-content">
                <input type="checkbox" style={{ scale: "1.5" }} />
                <div className="todo-text">
                  <h4>task -1</h4>
                  <p>description</p>
                </div>
              </div>
              <div className="todo-action">
                <MdDelete
                  size={35}
                  style={{
                    margin: " 0 15px 0 0",
                    padding: "5",
                    backgroundColor: "#ebebeb",
                    borderRadius: "5px",
                    boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
                  }}
                />
                <MdEdit
                  size={35}
                  style={{
                    padding: "5",
                    backgroundColor: "#ebebeb",
                    borderRadius: "5px",
                    boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
                  }}
                />
              </div>
            </li>
          </ul>
        </Box>
      </Box>
    </>
  );
}
