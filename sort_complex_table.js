
function convert_to_number(text) {
    text = text.replace(/\./g, "");
    text = text.replace(/\,/g, ".");
    var valor = parseFloat(text);
    return valor;
}

function sort_desc(a, b) {
    var index_base = -1;
    var aName = convert_to_number(a.find("td:eq(" + (index_base) + ")").text().toLowerCase());
    var bName = convert_to_number(b.find("td:eq(" + (index_base) + ")").text().toLowerCase());
    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
}
function sort_asc(a, b) {
    var index_base = -1;
    var aName = convert_to_number(a.find("td:eq(" + (index_base) + ")").text().toLowerCase());
    var bName = convert_to_number(b.find("td:eq(" + (index_base) + ")").text().toLowerCase());
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

var sort_complex = function (idtabela) {
    var asc = false;

    $(idtabela + ' thead th:eq(' + $(idtabela + ' thead').children().length + ')').addClass("sort_complex");
    $(idtabela + ' thead th').click(function () {
				
        var size = $(this).parent().children().length;
        if ($(this).index() == size - 1) {
        
            if (asc) {
                asc = false
                $(this).addClass("sort_complexAsc");
                $(this).removeClass("sort_complexDesc");
                $(this).removeClass("sort_complex");
            }
            else {
                asc = true;
                $(this).addClass("sort_complexDesc");
                $(this).removeClass("sort_complexAsc");
                $(this).removeClass("sort_complex");
            }

            var index = -2;
            var group_number = 0;
            var group = [];
            $(idtabela + ' tbody tr').each(function () {
                
                if ($(this).children().length >= 3) {
                    group_number++;
                    group[group_number] = new Array();

                    $(this).children(":eq(" + (index - 1) + ")").parent().attr("first", 'true');
                }
                group[group_number].push($(this));
            });

            for (g in group) {

                if (asc) {
                    group[g].sort(sort_desc);

                }
                else {
                    group[g].sort(sort_asc);
                }

                for (c in group[g]) {
                    if (group[g][c].attr("first") == 'true') {
                        if (c != 0) {
                            group[g][c].removeAttr("first");
                            group[g][0].prepend(group[g][c].find(":eq(" + (index - 1) + ")"));
                            
                            var count = 0;
                            while (count < size + index) {
                                group[g][0].prepend(group[g][c].find(":eq(" + (index - 1) + ")"));
                                count++;
                            }
                        }
                    }
                }
                for (c in group[g]) {
                    for (r = 0; r < $(idtabela + ' tbody tr').length; r++) {
                        tr_atual = $(idtabela + ' tbody').find("tr:eq(" + r + ")");
                        tr_sort = group[g][c];

                        if (tr_atual[0] == tr_sort[0]) {
                            tr_sort.clone().appendTo($(idtabela + ' tbody'));
                            tr_sort.remove();
                        }
                    }
                }
            }
        }
    });
};