interface GlobalContextType {
  userAuth: boolean;
  setUserAuth: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthAndRedirect: () => void;
}
