exports.post_to_url = function(path, username){

    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", path);

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "username");
    hiddenField.setAttribute("value", username);

    form.appendChild(hiddenField);

    document.body.appendChild(form);
    form.submit();
};