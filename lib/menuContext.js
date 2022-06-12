import  React  from  "react";
// Context has been created
const  MenuContext  =  React.createContext(false);
// Provider
const  MenuProvider  =  ({ children })  =>  {
    const  [toggle, setToggle]  =  React.useState(false);
    const toggleFunction =  ()  =>  {
    setToggle(!toggle);
};

return  (
    <MenuContext.Provider value={{ toggle, toggleFunction }}>
        {children}
    </MenuContext.Provider>
    );
};

export  {  MenuContext,  MenuProvider  };
