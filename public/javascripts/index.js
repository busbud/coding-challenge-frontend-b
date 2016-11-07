
    $(function() {
        function showTutorial() {
            // Really, chardinJS? Just `data-position`? No prefix?
            $(".departure").first().attr("data-intro", "departure details")
                                   .attr("data-position", "top");
            $(".arrival").first().attr("data-intro", "arrival details")
                                 .attr("data-position", "bottom");
            $(".price").first().attr("data-intro", "ticket price")
                               .attr("data-position", "top");
            $('body').chardinJs('start'); // is this really better than an explicit "start()" method? C'mon, chardinJS.
        }

        var callback = _.after(2, showTutorial);
        var template = _.template($("#departures-template").html());
        $.ajax("/api/departures", {
            success: function(data) {
                $("#departures").html(template(data));
                callback();
            },
            dataType: 'json'
        });

        $("#lets-get-started").click(function() {
            $("#onboarding").fadeOut(function() {
                $(this).remove();
                callback();
            });
        });
    });
