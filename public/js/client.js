var tree = {}

$.ajaxSetup({async: false});
$.getJSON('./index.json', function(data) {
  tree = data
})


var backboneRouter = Backbone.Router.extend({
    
    routes: {
      ':author_id/:project_id' : 'project',
      ':author_id' : 'author',
      '' : 'front'
    },
    
    project: function (author_id, project_id) {

      var tmpl = Handlebars.compile($('#template_project').html())
      $('.content').html(tmpl({
        author_id: author_id,
        project_id: project_id,
        project: tree[author_id].projects[project_id],
      }));

    },
    
    author: function (author_id) {

      var tmpl = Handlebars.compile($('#template_author').html())
      $('.content').html(tmpl({
        author_id: author_id,
        author: tree[author_id]
      }));

    },

    front: function () {

      var tmpl = Handlebars.compile($('#template_front').html())
      $('.content').html(tmpl({
        index: tree
      }));

    },
 
});


var router = new backboneRouter();
Backbone.history.start();