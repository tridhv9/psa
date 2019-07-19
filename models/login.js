var connection=require("./connection")

class login
{
    constructor(id,role,s1,s2)
    {
        this.id=id;
        this.role=role;
        this.supervise1=s1;
        this.supervise2=s2;
    }
    async login(id,password)
    {
        var arr=[]
        var session;
        var id_except=JSON.parse(await connection.connect("select HREMP_EMPID,HREMP_TITLE,HREMP_SUVISOR1,HREMP_SUVISOR2 from HREMP where HREMP_EMPID='"+id+"'"))
        console.log(id_except)
        if(id_except!="")
        {  
            var sup1,sup2,title,emp_id;
            var id_login=JSON.parse(await connection.connect("select * from tbl_login where emp_id='"+id+"'"))
            arr.push(id_login)
            console.log("ARRRRRRRRRR")
            console.log(id_except)
            id_except.forEach(Element=>{
                sup1=Element.HREMP_SUVISOR1
                sup2=Element.HREMP_SUVISOR2
                title=Element. HREMP_TITLE
            })
            console.log("ACH KO")
            console.log(id_login)
            if(id_login=="")
            {
                connection.connect("insert into tbl_login(emp_id,password,title,sup1,sup2) values('"+id+"','"+password+"','"+title+"','"+sup1+"','"+sup2+"')")
                session=new login(id,title,sup1,sup2)
            }
            else
            {
                arr.forEach(Element=>{
                    console.log(Element)
                    if(Element[0].password==password)
                     session=new login(id,title,sup1,sup2)
                    else
                        console.log("You have enterned wrong password")
                })
            }
        }
        else
        {
            console.log("Nothing at all")
        }
        return session
    }
}
module.exports=new login()