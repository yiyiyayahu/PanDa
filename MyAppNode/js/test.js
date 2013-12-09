function inputcheck(reg)
{
if (reg.pennID.value==null||reg.pennID.value=="")
  {
    alert("Please input your penn ID!");
    reg.pennID.focus();
    return (false);
  }
if (reg.FirstName.value==null||reg.FirstName.value=="")
  {
    alert("Please input your first name!");
    reg.FirstName.focus();
    return (false);
  }
if (reg.LastName.value==null||reg.LastName.value=="")
  {
    alert("Please input your last name!");
    reg.LastName.focus();
    return (false);
  }

var patrn=/^([0-9]){8}$/;
if (!patrn.exec(reg.pennID.value)) 
  {
    alert("your penn ID must be 8 valid digits!!");
    reg.pennID.focus();
    return (false);
  }
var patrn=/^([a-zA-Z]){1,15}$/;
if (!patrn.exec(reg.FirstName.value)) 
  {
    alert("your FirstName is not valid!");
    reg.FirstName.focus();
    return (false);
  }
var patrn=/^([a-zA-Z]){1,15}$/;
if (!patrn.exec(reg.LastName.value)) 
  {
    alert("your last name is not valid!");
    reg.LastName.focus();
    return (false);
  }

}