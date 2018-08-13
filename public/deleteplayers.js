function deletePlayers(id){
    $.ajax({
        url: '/players/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deletePlayerPosition(plyId, posId){
  $.ajax({
      url: '/players_position/plyid/' + plyId + '/posid/' + posId,
      type: 'DELETE',
      success: function(result){
          if(result.responseText != undefined){
            alert(result.responseText)
          }
          else {
            window.location.reload(true)
          } 
      }
  })
};
