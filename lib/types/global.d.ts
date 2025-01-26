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

interface ExpenditureModal {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  holdings: { name: string }[];
}

interface DisbursementModal {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  holdings: { name: string }[];
}

interface WalletContainer {
  bank: string;
  id: string;
}
