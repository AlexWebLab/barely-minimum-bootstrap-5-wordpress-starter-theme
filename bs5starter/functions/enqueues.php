<?php
function custom_enqueue_scripts()
{
  // * styles *

  // Bootstrap 5 style
  wp_register_style('bootstrap5', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css', false, '5.1.0', null);
  wp_enqueue_style('bootstrap5');

  // custom style
  wp_register_style('custom', get_template_directory_uri() . '/css/custom.css', false, '1.0.0', null);
  wp_enqueue_style('custom');

  // * scripts *

  // remove jQuery
  wp_deregister_script('jquery');
  // add latest jQuery * uncomment to enable jQuery *
  // wp_register_script('jquery', 'https://code.jquery.com/jquery-3.6.0.js', false, '3.6.0', false);
  // wp_enqueue_script('jquery');

  wp_register_script('bootstrap5', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js', false, '5.1.0', true);
  wp_enqueue_script('bootstrap5');

  // custom script
  wp_register_script('custom', get_template_directory_uri() . '/js/custom.js', false, '1.0.0', true);
  wp_enqueue_script('custom');
}

add_action('wp_enqueue_scripts', 'custom_enqueue_scripts', 100);