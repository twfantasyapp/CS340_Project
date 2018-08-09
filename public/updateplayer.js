function updatePlayer(id){
    $.ajax({
        url: '/players/' + id,
        type: 'PUT',
        data: $('#update-players').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
