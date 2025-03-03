import { Timestamp } from "firebase/firestore";
import TransactionContainer from "../components/homepage/transactionContainer";

declare global {
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

  interface BottomNavPropsHoldings {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface ExpenditureModal {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    modal: boolean;
    holdings: { name: string }[];
  }
  s;
  interface DisbursementModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    modal: boolean;
    holdings: { name: string }[];
  }

  interface WalletModal {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    modal: boolean;
  }

  interface TransactionContainerProps {
    transaction: {
      category: string;
      amount: number;
      updatedOn: Timestamp;
      wallet: string;
      remarks: string;
    };
  }
}
