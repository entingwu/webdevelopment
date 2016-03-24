var forms = require("./form.mock.json");
var Guid = require('guid');
module.exports = function(app) {
    "use strict";
    var api = {
        //FORM
        createFormForUser : createFormForUser,
        findFormByTitle : findFormByTitle,
        findFormById : findFormById,
        findAllFormsForUser : findAllFormsForUser,
        findAllForms : findAllForms,
        updateFormById : updateFormById,
        deleteFormById : deleteFormById,

        //FIELD
        findAllFieldsForForm : findAllFieldsForForm,
        findFieldById : findFieldById,
        createFieldForForm : createFieldForForm,
        updateFieldById : updateFieldById,
        deleteFieldById : deleteFieldById
    };
    return api;

    /* I. FORM */

    function createFormForUser(userId, form) {
        var newForm = {
            _id : Guid.create(),
            title : form.title,
            userId : userId*1,
            fields : form.fields
        };
        forms.push(newForm);//restore
        return newForm;
    }

    function findFormByTitle(title) {
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].title == title) {
                return forms[i];
            }
        }
        return null;
    }

    function findFormById(formId) {
        for(var i = 0; i < forms.length; i++) {
            if(forms[i]._id == formId) {
                console.log("find form");
                console.log(forms[i]);
                return forms[i];
            }
        }
        return null;
    }

    function findAllFormsForUser(userId) {
        var formsForUser = [];
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].userId == userId) {
                formsForUser.push(forms[i]);
            }
        }
        return formsForUser;
    }

    function findAllForms() {
        return forms;
    }

    function updateFormById(formId, newForm) {
        for(var i = 0; i < forms.length; i++) {
            if(forms[i]._id == formId) {
                forms[i] = newForm;
                console.log("update form");
                console.log(newForm);
                return forms[i];
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        for(var i = 0; i < forms.length; i++) {
            if(forms[i]._id == formId) {
                forms.splice(i, 1);
            }
        }
        return forms;
    }

    /* II. FIELD */

    function findAllFieldsForForm(formId) {
        var form = findFormById(formId);
        var fields = [];
        if(form != null) {
            fields = form.fields;
            console.log("found fields");
            console.log(fields);
        }
        return fields;
    }

    function findFieldById(formId, fieldId) {
        var form = findFormById(formId);
        if(form != null) {
            var fields = form.fields;
            for(var i = 0; i < fields.length; i++) {
                if(fields[i]._id == fieldId) {
                    return fields[i];
                }
            }
        }
        return null;
    }

    function createFieldForForm(formId, field) {
        var form = findFormById(formId);
        var newField = {
            _id : Guid.create(),
            label : field.label,
            type : field.type,
            placeholder : field.placeholder,
            options : field.options
        };
        if(form != null) {
            if(form.fields != null) {//restore
                form.fields.push(newField);
            }else {
                form.fields = [newField];
            }
            console.log("added field in form");
            console.log(form.fields);
        }
        return newField;
    }

    function updateFieldById(formId, fieldId, newField) {
        var field = findFieldById(formId, fieldId);
        field = newField;
        console.log("updated field");
        console.log(field);
        return field;
    }

    function deleteFieldById(formId, fieldId) {
        var form = findFormById(formId);
        for(var i = 0; i < form.fields.length; i++) {
            if(form.fields[i] == fieldId) {
                form.fields.splice(i, 1);
                console.log("deleted field from form");
                console.log(form.fields);
            }
        }
        return form.fields;
    }

};
