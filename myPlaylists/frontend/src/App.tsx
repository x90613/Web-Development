import { useEffect, useState } from "react";

import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import "./App.css";
import CardList from "@/components/CardList";
import HeaderBar from "@/components/HeaderBar";
import NewListDialog from "@/components/NewListDialog";
import useCards from "@/hooks/useCards";

function App() {
  const { lists, fetchLists, fetchCards } = useCards();
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const [deleteDisplay, setDeleteDisplay] = useState(false);

  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

  return (
    <>
      <HeaderBar />
      <div className="ButtomDiv">
          <Button
            variant="contained"
            sx={{ml:8}}
            className="w-80 background-color: #D97706"
            onClick={() => setNewListDialogOpen(true)}
          >
            <AddIcon className="mr-2" />
            create
          </Button>
          <NewListDialog
          open={newListDialogOpen}
          onClose={() => setNewListDialogOpen(false)}
          />
          <Button
            variant="contained"
            sx={{ml:8}}
            color={deleteDisplay?"success":"error"}
            className="w-80"
            onClick={() => setDeleteDisplay(!deleteDisplay)}
            >
            <AddIcon className="mr-2" />
            {deleteDisplay?"DONE":"DELETE"}
          </Button>
      </div>

      <main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
        {lists.map((list) => (
          <CardList key={list.id} {...list} 
            display={deleteDisplay}
          />
        ))}
      </main>
    </>
  );
}

export default App;
