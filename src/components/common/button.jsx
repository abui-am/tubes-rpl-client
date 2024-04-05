import clsx from 'clsx';
import PropTypes from 'prop-types';

function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={clsx(
        className,
        'p-4 text-base leading-[100%] bg-[#2FA7EA] rounded-lg text-white font-bold'
      )}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
