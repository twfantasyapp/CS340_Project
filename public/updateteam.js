function updateTeam(id){
    $.ajax({
        url: '/teams/' + id,
        type: 'PUT',
        data: $('#update-teams').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
