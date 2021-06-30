import React from "react";

export function UseModalDialog(){
    const [open, setOpen] = React.useState<boolean>(false);
    const [modalValue,setmodalValue] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose (accept:boolean) {
      setmodalValue(accept);
      setOpen(false);
  };

  return {handleClickOpen,handleClose,open,modalValue,setmodalValue}
}