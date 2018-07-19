/*
 * 01-quick_reply.js - Quick reply popup when clicking on post ID.
 *                     Always available, no local storage variable.
 * 
 * Copyright (c) 2017 Austin Lgray <austin_lgray@yahoo.com>
 */
$(document).ready(function() {
  $origPostForm = $('form[method="POST"]:first');
  $(document).on('click', '.number', function() {
    var form_body = $('.formbox').clone();
    form_body.clone();
    if($("#quick-reply").length == 0) {
      var qr_html  = '<div id="quick-reply" class="ui-draggable qrshow">';
          qr_html +=   '<div id="post-form-inner">';
          qr_html +=     '<div><span class="handle" style="cursor: move;">Quick Reply <a class="close-btn" href="javascript:void(0)">x</a></span></div>';
          qr_html +=     '<div id="formfields">'+form_body.html()+'</div>';
          qr_html +=   '</div>';
          qr_html +=  '</div>';

      $(document.body).append(qr_html);

      $("#quick-reply form").empty();
      $("#formfields form").append($origPostForm.find('input[name="FROM"]').clone());
      $("#formfields form").append($origPostForm.find('input[name="mail"]').clone());
      $("#formfields form").append($origPostForm.find('textarea[name="MESSAGE"]').clone());
      $("#formfields form").append($origPostForm.find('input[name="bbs"]').clone());
      $("#formfields form").append($origPostForm.find('input[name="key"]').clone());
      $("#formfields form").append($origPostForm.find('input[name="time"]').clone());
      $("#formfields form").append($origPostForm.find('input[name="submit"]').clone());

      $("#quick-reply .oekaki_load1").remove();
      $("#quick-reply textarea[name=MESSAGE]").attr("id", "qrMESSAGE");
    }

    if(typeof form_body === "undefined") {return false;}

    //var id = $(this).html();
    var id = $(this).text().trim();
    var textarea_qr = document.getElementById('qrMESSAGE');
    var textarea_nm = document.getElementById('MESSAGE');
    if (!textarea_qr) return false;

    if (document.selection) {
      // IE
      textarea_qr.focus();
      var sel  = document.selection.createRange();
      sel.text = '>>' + id + '\n';
    } else if (textarea_qr.selectionStart || textarea_qr.selectionStart == '0') {
      var start = textarea_qr.selectionStart;
      var end   = textarea_qr.selectionEnd;
      textarea_qr.value = textarea_qr.value.substring(0, start) + '>>' + id + '\n' + textarea_qr.value.substring(end, textarea_qr.value.length);

      textarea_qr.selectionStart += ('>>' + id).length + 1;
      textarea_qr.selectionEnd    = textarea_qr.selectionStart;
    } else {
      textarea_qr.value += '>>' + id + '\n';
    }

    $("#MESSAGE").val($("#qrMESSAGE").val());
    $('#quick-reply input[name="FROM"]').on('change input propertychange', function() {
      $origPostForm.find('input[name="FROM"]').val($(this).val());
    });
    $('#quick-reply input[name="mail"]').on('change input propertychange', function() {
      $origPostForm.find('input[name="mail"]').val($(this).val());
    });
    $("#qrMESSAGE").on('change input propertychange', function() {
      $origPostForm.find('textarea[name="MESSAGE"]').val($(this).val());
    });

    $( ".ui-draggable" ).draggable();
  });

  $origPostForm.find('input[name="FROM"]').on('change input propertychange', function() {
    $('#quick-reply input[name="FROM"]').val($(this).val());
  });
  $origPostForm.find('input[name="mail"]').on('change input propertychange', function() {
    $('#quick-reply input[name="mail"]').val($(this).val());
  });
  $origPostForm.find('textarea[name="MESSAGE"]').on('change input propertychange', function() {
    $("#qrMESSAGE").val($(this).val());
  });
  $(document).on('click', '.close-btn', function () {
    $("#quick-reply").remove();
  });
});
