interface GlobalContextType {
  userAuth: boolean;
  setUserAuth: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthAndRedirect: () => void;
}

interface BottomNavProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBottomNav: React.Dispatch<React.SetStateAction<string>>;
  bottomNav: string;
}

interface TrackerModal {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
}

interface SavingsModal {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  bottomNav: string;
}
