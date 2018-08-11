function updateCoach(id){
    $.ajax({
        url: '/coaches/' + id,
        type: 'PUT',
        data: $('#update-coaches').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
