module ApplicationHelper

  def nav_link(text, path, options={})
    clazz = "nav-item lead font-weight-bold #{options.delete(:class)}"
    method = options.delete(:method)
    if current_page?(path)
      clazz += " active"
      text = text + " <span class='sr-only'>(current)</span>"
    end

    content_tag(:li, {class: clazz}.merge(options)) do
      link_to raw(text), path, class: 'nav-link', method: (method || :get)
    end
  end

  def datetime_selector
    "hello"
  end


end
