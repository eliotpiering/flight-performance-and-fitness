module ApplicationHelper

  def nav_link(text, path, options={})
    clazz = "nav-item lead font-weight-bold #{options.delete(:class)}"
    method = options.delete(:method)
    if current_page?(path)
      clazz += " active"
      text = text + " <span class='sr-only'>(current)</span>"
    end

    content_tag(:li, {class: clazz}.merge(options)) do
      link_to raw(text), path, class: 'nav-link', method: method
    end
  end

  def datetime_selector
    "hello"
  end

  def sanitize_tags_list
    ["div", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "em", "br", "hr", "p", "a", "b", "img", "figure", "figcaption", "blockquote", "pre"]
  end

  def sanitize_attr_list
    ["src", "href", "class", "width", "height"]
  end

  def tag_select_helper(form, post)
    items = Tag.all.pluck(:title, :id)
    selected = post.tags.ids
    form.select(:tag_id, items, {selected: selected}, class: "tag-selection", multiple: true, data: {
     tag_url: post_post_tags_path(post.id)
    })
  end
end
